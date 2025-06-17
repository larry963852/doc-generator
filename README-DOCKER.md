# Generador de Documentación

Una aplicación moderna construida con **Next.js 15**, **TailwindCSS** y **Tiptap** para generar carpetas y archivos de documentación para Docusaurus de manera simple y eficiente.

## ✨ Características

- 🎨 **Interfaz moderna** con tema oscuro elegante
- 📁 **Creación de carpetas** con archivos `_category_.json` automáticos
- 📄 **Creación de archivos Markdown** con editor integrado
- ✏️ **Editor enriquecido** con toolbar completo (títulos, listas, negritas, etc.)
- 🗂️ **Selección de carpeta padre** para organizar archivos
- 🔄 **Edición en tiempo real** de elementos creados
- 💾 **Generación física** de archivos en el sistema
- 🎯 **Optimizado para Docusaurus**
- 📱 **Diseño responsivo**
- 🐳 **Soporte Docker** con acceso externo

## 🚀 Acceso Rápido

### 🌐 Aplicación Web (Recomendado)

La aplicación ya está ejecutándose y es accesible desde:

**URL Principal:** [http://130.150.47.203:3002](http://130.150.47.203:3002)

### 🐳 Gestión Docker

Para administrar el contenedor Docker, usa el script de gestión:

```bash
# Ver ayuda y comandos disponibles
./docker-manager.sh help

# Iniciar contenedor (acceso desde IP específica)
./docker-manager.sh start

# Iniciar contenedor (acceso desde cualquier IP)
./docker-manager.sh start-open

# Ver estado del contenedor
./docker-manager.sh status

# Ver logs en tiempo real
./docker-manager.sh logs

# Reiniciar contenedor
./docker-manager.sh restart

# Detener contenedor
./docker-manager.sh stop

# Reconstruir imagen
./docker-manager.sh build

# Limpiar todo
./docker-manager.sh clean
```

## 🛠️ Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `./docker-manager.sh` | Script principal para gestión completa |
| `./run-docker.sh` | Script simple para iniciar con IP específica |
| `./run-docker-open.sh` | Script simple para iniciar con acceso abierto |

## 📝 Cómo Usar la Aplicación

1. **Accede a la aplicación:** [http://130.150.47.203:3002](http://130.150.47.203:3002)

2. **Crear una carpeta:**
   - Selecciona "Carpeta" como tipo de elemento
   - Ingresa el nombre de la carpeta
   - Añade una descripción
   - Establece la posición en el menú
   - Haz clic en "Agregar Carpeta"

3. **Crear un archivo:**
   - Selecciona "Archivo MD" como tipo de elemento
   - Ingresa el nombre del archivo (sin extensión .md)
   - Selecciona la carpeta destino (opcional)
   - Escribe el contenido en Markdown
   - Haz clic en "Agregar Archivo"

4. **Generar archivos:**
   - Una vez que hayas agregado carpetas y archivos
   - Haz clic en "Generar Archivos"
   - Los archivos se crearán en el directorio de documentación

## 🗂️ Estructura de Archivos Generados

```
docs/
├── carpeta-ejemplo/
│   ├── _category_.json
│   └── archivo-ejemplo.md
└── archivo-raiz.md
```

## 🔧 Configuración

### Ruta de Documentación

La aplicación está configurada para generar archivos en:
```
/home/sistemas/gitbook/gorehco-docs/docs/
```

### Puertos y Acceso

- **Puerto interno:** 3002
- **Acceso externo:** http://130.150.47.203:3002
- **Acceso local:** http://localhost:3002 (solo si se usa `start-open`)

## 🛠️ Desarrollo Local

Si necesitas desarrollar o modificar la aplicación:

### Instalación

```bash
# Clonar e instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar versión de producción
npm run start
```

### Tecnologías Utilizadas

- **Framework:** Next.js 15 (App Router)
- **Estilos:** TailwindCSS
- **Iconos:** Lucide React
- **Notificaciones:** React Hot Toast
- **Contenedorización:** Docker

## 🐛 Resolución de Problemas

### El contenedor no inicia

```bash
# Verificar que la imagen existe
docker images | grep docs-generator

# Verificar logs del contenedor
./docker-manager.sh logs

# Reconstruir la imagen si es necesario
./docker-manager.sh build
```

### No se puede acceder externamente

1. Verifica que el contenedor esté corriendo:
   ```bash
   ./docker-manager.sh status
   ```

2. Verifica que el puerto esté mapeado correctamente:
   ```bash
   docker port docs-generator-container
   ```

3. Asegúrate de que el firewall permita conexiones en el puerto 3002

### Problemas con la generación de archivos

1. Verifica que la ruta de destino exista y sea accesible
2. Revisa los logs del contenedor para errores específicos
3. Asegúrate de que los permisos de escritura sean correctos

## 📞 Soporte

Para reportar problemas o solicitar mejoras, revisa los logs del contenedor:

```bash
./docker-manager.sh logs
```

---

**¡Tu aplicación está lista y accesible en http://130.150.47.203:3002! 🎉**
