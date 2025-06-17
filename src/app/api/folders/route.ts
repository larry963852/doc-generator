import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    // Ruta donde están las carpetas de documentación
    const docsPath = '/home/sistemas/gitbook/gorehco-docs/docs';
    
    // Verificar que la ruta existe
    if (!existsSync(docsPath)) {
      return NextResponse.json({ 
        error: 'La ruta de documentación no existe', 
        path: docsPath 
      }, { status: 400 });
    }

    // Leer contenido del directorio
    const items = await readdir(docsPath);
    const folders = [];

    for (const item of items) {
      const itemPath = join(docsPath, item);
      
      try {
        const stats = await stat(itemPath);
        
        // Solo incluir directorios, excluir archivos
        if (stats.isDirectory()) {
          // Intentar leer el _category_.json si existe
          let categoryInfo = null;
          let position = null;
          const categoryPath = join(itemPath, '_category_.json');
          
          if (existsSync(categoryPath)) {
            try {
              const { readFile } = await import('fs/promises');
              const categoryContent = await readFile(categoryPath, 'utf8');
              const categoryData = JSON.parse(categoryContent);
              position = categoryData.position || null;
              categoryInfo = {
                hasCategory: true,
                name: item,
                position
              };
            } catch {
              // Error leyendo el archivo, pero la carpeta existe
              categoryInfo = {
                hasCategory: false,
                name: item,
                position: null
              };
            }
          } else {
            categoryInfo = {
              hasCategory: false,
              name: item,
              position: null
            };
          }

          folders.push({
            name: item,
            path: itemPath,
            hasCategory: categoryInfo?.hasCategory || false,
            position: categoryInfo?.position || null,
            type: 'existing'
          });
        }
      } catch (error) {
        // Error accediendo al item, continuar con el siguiente
        console.error(`Error accessing ${item}:`, error);
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      folders: folders.sort((a, b) => a.name.localeCompare(b.name)), // Ordenar alfabéticamente
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
