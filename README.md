# Generador de Documentación

Una aplicación moderna construida con **Next.js 15**, **TailwindCSS** y **Tiptap** para generar carpetas y archivos de documentación para Docusaurus de manera simple y eficiente.

## ✨ Características

- 🎨 **Interfaz moderna** con tema oscuro elegante
- 📁 **Creación de carpetas** con archivos `_category_.json` automáticos  
- 📄 **Creación de archivos Markdown** con editor Tiptap integrado
- ✏️ **Editor enriquecido** con toolbar completo (títulos, listas, negritas, etc.)
- 🗂️ **Selección de carpeta padre** para organizar archivos
- 🔄 **Edición en tiempo real** de elementos creados
- 💾 **Generación física** de archivos en el sistema
- 🎯 **Optimizado para Docusaurus** con posiciones automáticas
- 📱 **Diseño responsivo**
- 🌐 **Acceso local y externo** habilitado
- 📍 **Sistema de posiciones inteligente** - auto-calcula la siguiente posición disponible

## 🚀 Instalación y Uso

### � Instalación

```bash
# Clonar el repositorio
git clone <tu-repo>
cd docs-generator

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con acceso externo)
npm run dev

# O construir y ejecutar en producción
npm run build
npm start
```

**URLs de acceso:**
- **Local:** http://localhost:3002
- **Externo:** http://130.150.47.203:3002
## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **React 19** - Biblioteca de interfaz de usuario  
- **Tailwind CSS v4** - Framework de CSS
- **TypeScript** - Tipado estático
- **Tiptap** - Editor de texto enriquecido
- **Lucide React** - Iconos modernos
- **React Hot Toast** - Notificaciones

## 📖 Uso

### ✨ Sistema de Posiciones Inteligente
La aplicación calcula automáticamente la siguiente posición disponible para las carpetas:
- 📊 **Visualización en tiempo real** de posiciones ocupadas
- 🔢 **Auto-incremento** de posiciones (2, 3, 4, etc.)  
- 📍 **Información contextual** durante la creación

### Crear Carpetas
1. Selecciona "Carpeta" como tipo de elemento
2. Ingresa el nombre de la carpeta
3. Añade una descripción (opcional)
4. La posición se asigna automáticamente
5. Haz clic en "Agregar Carpeta"

### Crear Archivos MD
1. Selecciona "Archivo MD" como tipo de elemento
2. Ingresa el nombre del archivo (sin extensión)
3. Selecciona una carpeta padre (opcional)
4. Escribe el contenido usando el editor Tiptap
5. Haz clic en "Agregar Archivo"

### Generar Archivos
1. Después de agregar elementos, haz clic en "Generar Archivos"
2. Los archivos se crearán automáticamente en `/home/sistemas/gitbook/gorehco-docs/docs`

## 📁 Estructura de Archivos Generados

### Carpetas
Se crea la carpeta con `_category_.json` automático:
```json
{
  "label": "Nombre de la Carpeta",
  "position": 2,
  "link": {
    "type": "generated-index", 
    "description": "Descripción de la carpeta"
  }
}
```

### Archivos Markdown
- Se crean con extensión `.md`
- Contienen el contenido Markdown del editor Tiptap
- Se ubican en la carpeta padre seleccionada

## 🔧 Configuración

**Ruta de destino:** `/home/sistemas/gitbook/gorehco-docs/docs`  
Modifica esta ruta en `src/app/api/generate/route.ts` si es necesario.

**Puerto de acceso:** `3002`  
Configurable en `package.json` scripts.

## 📝 Scripts Disponibles

- `npm run dev` - Modo desarrollo (acceso local + externo)
- `npm run build` - Construir para producción  
- `npm run start` - Ejecutar en producción
- `npm run lint` - Linter de código

## 🎯 Características Especiales

- 🔄 **Recarga automática** de carpetas existentes
- 📱 **Diseño responsivo** y moderno
- 🌐 **Acceso externo** habilitado por defecto
- ⚡ **Editor Tiptap** con toolbar completo
- � **Indicadores visuales** de posiciones
- 🗂️ **Organización** por carpetas padre
