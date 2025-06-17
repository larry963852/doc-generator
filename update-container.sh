#!/bin/bash

# Script de actualización rápida del contenedor docs-generator
# Reconstruye la imagen con cambios y reinicia el contenedor

echo "🔄 ACTUALIZANDO DOCS-GENERATOR CON CAMBIOS"
echo "========================================="

# Cambiar al directorio correcto
cd /home/sistemas/gitbook/docs-generator

echo "📍 Directorio de trabajo: $(pwd)"
echo ""

# Paso 1: Detener y limpiar contenedor actual
echo "⏹️  Paso 1: Deteniendo contenedor actual..."
docker stop docs-generator-container 2>/dev/null || true
docker rm docs-generator-container 2>/dev/null || true
echo "✅ Contenedor limpiado"
echo ""

# Paso 2: Reconstruir imagen
echo "🔨 Paso 2: Reconstruyendo imagen con cambios..."
docker build -t docs-generator:latest --no-cache .

if [ $? -eq 0 ]; then
    echo "✅ Imagen reconstruida exitosamente"
    echo ""
    
    # Paso 3: Iniciar nuevo contenedor
    echo "🚀 Paso 3: Iniciando nuevo contenedor..."
    docker run -d \
        --name docs-generator-container \
        -p 130.150.47.203:3002:3002 \
        --restart unless-stopped \
        docs-generator:latest
    
    if [ $? -eq 0 ]; then
        echo "✅ Contenedor iniciado exitosamente"
        echo ""
        echo "🌐 Tu aplicación actualizada está disponible en:"
        echo "   http://130.150.47.203:3002"
        echo ""
        echo "📊 Estado del contenedor:"
        docker ps | grep docs-generator-container
        echo ""
        echo "🎉 ¡Actualización completada!"
    else
        echo "❌ Error al iniciar el contenedor"
        exit 1
    fi
else
    echo "❌ Error al construir la imagen"
    exit 1
fi
