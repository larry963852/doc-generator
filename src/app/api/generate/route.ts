import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  content?: string;
  description?: string;
  position?: number;
  parentFolder?: string; // Nueva propiedad para carpeta padre
}

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: FileItem[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    // Detectar si estamos en Docker o desarrollo local
    const isDocker = process.env.NODE_ENV === 'production' || existsSync('/app/gorehco-docs');
    const docsPath = isDocker 
      ? '/app/gorehco-docs/docs' 
      : '/home/sistemas/gitbook/gorehco-docs/docs';
    
    // Verificar que la ruta existe
    if (!existsSync(docsPath)) {
      return NextResponse.json({ 
        error: 'La ruta de documentación no existe', 
        path: docsPath 
      }, { status: 400 });
    }

    const results = [];

    // Procesar carpetas primero para asegurar que existan antes de crear archivos
    const folders = items.filter(item => item.type === 'folder');
    const files = items.filter(item => item.type === 'file');

    // Crear carpetas primero
    for (const item of folders) {
      try {
        // Crear carpeta
        const folderPath = join(docsPath, item.name);
        await mkdir(folderPath, { recursive: true });

        // Crear archivo _category_.json
        const categoryJson = {
          label: item.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          position: item.position || 1,
          link: {
            type: "generated-index",
            description: item.description || `Documentación de ${item.name}`
          }
        };

        const categoryPath = join(folderPath, '_category_.json');
        await writeFile(categoryPath, JSON.stringify(categoryJson, null, 2), 'utf8');

        results.push({
          type: 'folder',
          name: item.name,
          path: folderPath,
          files: ['_category_.json'],
          categoryJson
        });

      } catch (itemError) {
        console.error(`Error processing folder ${item.name}:`, itemError);
        results.push({
          type: 'error',
          name: item.name,
          error: itemError instanceof Error ? itemError.message : 'Unknown error'
        });
      }
    }

    // Luego crear archivos
    for (const item of files) {
      try {
        // Crear archivo markdown
        const fileName = `${item.name}.md`;
        let filePath: string;
        
        if (item.parentFolder) {
          // Crear en carpeta específica
          const parentFolderPath = join(docsPath, item.parentFolder);
          
          // Verificar que la carpeta padre existe
          if (!existsSync(parentFolderPath)) {
            throw new Error(`La carpeta padre "${item.parentFolder}" no existe. Crea primero la carpeta.`);
          }
          
          filePath = join(parentFolderPath, fileName);
        } else {
          // Crear en la raíz de docs
          filePath = join(docsPath, fileName);
        }
        
        const content = item.content || `# ${item.name}\n\nContenido del documento.`;

        await writeFile(filePath, content, 'utf8');

        results.push({
          type: 'file',
          name: fileName,
          path: filePath,
          parentFolder: item.parentFolder
        });

      } catch (itemError) {
        console.error(`Error processing file ${item.name}:`, itemError);
        results.push({
          type: 'error',
          name: item.name,
          error: itemError instanceof Error ? itemError.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Archivos generados exitosamente',
      path: docsPath,
      results
    });

  } catch (error) {
    console.error('Error generating files:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
