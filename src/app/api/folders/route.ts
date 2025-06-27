import { NextResponse } from 'next/server';
import { readdir, stat, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

interface FolderInfo {
  name: string;
  path: string;
  hasCategory: boolean;
  position: number | null;
  type: 'existing';
}

export async function GET() {
  try {
    // Detectar si estamos en Docker o desarrollo local
    const isDocker = process.env.NODE_ENV === 'production' || existsSync('/app/gorehco-docs');
    const docsPath = isDocker 
      ? '/app/gorehco-docs/docs' 
      : '/home/sistemas/gitbook/gorehco-docs/docs';
    
    if (!existsSync(docsPath)) {
      return NextResponse.json({ 
        error: 'La ruta de documentación no existe', 
        path: docsPath 
      }, { status: 400 });
    }

    const items = await readdir(docsPath);
    const folders: FolderInfo[] = [];

    // Procesar cada carpeta
    for (const item of items) {
      const itemPath = join(docsPath, item);
      
      try {
        const stats = await stat(itemPath);
        
        if (stats.isDirectory()) {
          const categoryPath = join(itemPath, '_category_.json');
          let position: number | null = null;
          let hasCategory = false;
          
          if (existsSync(categoryPath)) {
            try {
              const categoryContent = await readFile(categoryPath, 'utf8');
              const categoryData = JSON.parse(categoryContent);
              position = categoryData.position || null;
              hasCategory = true;
            } catch (error) {
              console.error(`Error leyendo _category_.json en ${item}:`, error);
            }
          }

          folders.push({
            name: item,
            path: itemPath,
            hasCategory,
            position,
            type: 'existing'
          });
        }
      } catch (error) {
        console.error(`Error accediendo a ${item}:`, error);
        continue;
      }
    }

    // Ordenar: primero por posición (si existe), luego alfabéticamente
    const sortedFolders = folders.sort((a, b) => {
      if (a.position !== null && b.position !== null) {
        return a.position - b.position;
      }
      if (a.position !== null) return -1;
      if (b.position !== null) return 1;
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({
      success: true,
      folders: sortedFolders,
      path: docsPath
    });

  } catch (error) {
    console.error('Error reading folders:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
