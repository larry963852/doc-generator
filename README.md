# Generador de Documentación

Una aplicación moderna construida con **Next.js 15** y **Tailwind CSS** para generar carpetas y archivos de documentación para Docusaurus de manera simple y eficiente.

## ✨ Características

- 🎨 **Interfaz moderna** con tema claro y oscuro
- 📁 **Creación de carpetas** con archivos `_category_.json` automáticos
- 📄 **Creación de archivos Markdown** con editor integrado
- 🔄 **Edición en tiempo real** de elementos creados
- 💾 **Generación física** de archivos en el sistema
- 🎯 **Optimizado para Docusaurus**
- 📱 **Diseño responsivo**

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **React 19** - Biblioteca de interfaz de usuario
- **Tailwind CSS v4** - Framework de CSS
- **TypeScript** - Tipado estático
- **Lucide React** - Iconos modernos
- **React Hot Toast** - Notificaciones

## 📖 Uso

### Crear Carpetas
1. Selecciona "Carpeta" como tipo de elemento
2. Ingresa el nombre de la carpeta
3. Añade una descripción (opcional)
4. Establece la posición en el menú
5. Haz clic en "Agregar Carpeta"

### Crear Archivos MD
1. Selecciona "Archivo MD" como tipo de elemento
2. Ingresa el nombre del archivo (sin extensión)
3. Escribe el contenido en Markdown
4. Haz clic en "Agregar Archivo"

### Generar Archivos
1. Después de agregar elementos, haz clic en "Generar Archivos"
2. Los archivos se crearán automáticamente en `/home/sistemas/gitbook/gorehco-docs/docs`

## 📁 Estructura de Archivos Generados

### Carpetas
- Se crea la carpeta con el nombre especificado
- Se genera automáticamente un archivo `_category_.json` con:
  ```json
  {
    "label": "Nombre de la Carpeta",
    "position": 1,
    "link": {
      "type": "generated-index",
      "description": "Descripción de la carpeta"
    }
  }
  ```

### Archivos Markdown
- Se crean con extensión `.md`
- Contienen el contenido Markdown especificado

## 🎨 Tema Oscuro

La aplicación incluye un toggle para cambiar entre tema claro y oscuro, con transiciones suaves y persistencia de la preferencia del usuario.

## 🔧 Configuración

La ruta de destino para los archivos generados está configurada en:
```typescript
const docsPath = '/home/sistemas/gitbook/gorehco-docs/docs';
```

Puedes modificar esta ruta en el archivo `src/app/api/generate/route.ts`.

## 📝 Scripts Disponibles

- `npm run dev` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter de código

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir cambios o mejoras.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
