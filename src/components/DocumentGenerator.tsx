'use client';

import { useState } from 'react';
import { FolderPlus, FileText, Download, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  content?: string;
  description?: string;
  position?: number;
  parentFolder?: string; // Nueva propiedad para indicar en qué carpeta va el archivo
}

export default function DocumentGenerator() {
  const [items, setItems] = useState<FileItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'folder' | 'file'>('folder');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [folderDescription, setFolderDescription] = useState('');
  const [folderPosition, setFolderPosition] = useState(1);
  const [selectedParentFolder, setSelectedParentFolder] = useState<string>(''); // Nueva state para carpeta padre

  const addItem = () => {
    if (!newItemName.trim()) {
      toast.error('Por favor ingresa un nombre');
      return;
    }

    const newItem: FileItem = {
      id: Date.now().toString(),
      name: newItemName,
      type: newItemType,
    };

    if (newItemType === 'folder') {
      newItem.description = folderDescription || `Documentación de ${newItemName}`;
      newItem.position = folderPosition;
    } else {
      newItem.content = fileContent || `# ${newItemName}\n\nContenido del documento.`;
      newItem.parentFolder = selectedParentFolder || undefined; // Asignar carpeta padre si se seleccionó
    }

    setItems([...items, newItem]);
    setNewItemName('');
    setFileContent('');
    setFolderDescription('');
    setSelectedParentFolder(''); // Limpiar selección de carpeta padre
    setFolderPosition(folderPosition + 1);
    toast.success(`${newItemType === 'folder' ? 'Carpeta' : 'Archivo'} agregado exitosamente`);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Elemento eliminado');
  };

  const editItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      setEditingItem(id);
      setNewItemName(item.name);
      setNewItemType(item.type);
      if (item.type === 'folder') {
        setFolderDescription(item.description || '');
        setFolderPosition(item.position || 1);
      } else {
        setFileContent(item.content || '');
        setSelectedParentFolder(item.parentFolder || ''); // Cargar carpeta padre
      }
    }
  };

  const saveEdit = () => {
    if (!editingItem) return;

    setItems(items.map(item => {
      if (item.id === editingItem) {
        const updatedItem = { ...item, name: newItemName };
        if (item.type === 'folder') {
          updatedItem.description = folderDescription;
          updatedItem.position = folderPosition;
        } else {
          updatedItem.content = fileContent;
          updatedItem.parentFolder = selectedParentFolder || undefined; // Actualizar carpeta padre
        }
        return updatedItem;
      }
      return item;
    }));

    setEditingItem(null);
    setNewItemName('');
    setFileContent('');
    setFolderDescription('');
    setSelectedParentFolder(''); // Limpiar selección de carpeta padre
    toast.success('Elemento actualizado');
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setNewItemName('');
    setFileContent('');
    setFolderDescription('');
    setSelectedParentFolder(''); // Limpiar selección de carpeta padre
  };

  const generateFiles = async () => {
    if (items.length === 0) {
      toast.error('No hay elementos para generar');
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Archivos generados exitosamente en: ${result.path}`);
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message}`);
      }
    } catch (error) {
      toast.error('Error al generar archivos');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen dark bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Generador de Documentación
            </h1>
            <p className="text-gray-300">
              Crea carpetas y archivos para tu documentación de Docusaurus
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6">
              {editingItem ? 'Editar Elemento' : 'Agregar Nuevo Elemento'}
            </h2>

            <div className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Tipo de elemento
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setNewItemType('folder')}
                    className={`flex items-center px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      newItemType === 'folder'
                        ? 'border-blue-500 bg-blue-900/20 text-blue-300'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <FolderPlus className="w-5 h-5 mr-2" />
                    Carpeta
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItemType('file')}
                    className={`flex items-center px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      newItemType === 'file'
                        ? 'border-green-500 bg-green-900/20 text-green-300'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Archivo MD
                  </button>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre {newItemType === 'file' ? '(sin extensión)' : ''}
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder={newItemType === 'folder' ? 'nombre-carpeta' : 'nombre-archivo'}
                />
              </div>

              {/* Folder specific fields */}
              {newItemType === 'folder' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={folderDescription}
                      onChange={(e) => setFolderDescription(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Descripción de la carpeta para la documentación"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Posición
                    </label>
                    <input
                      type="number"
                      value={folderPosition}
                      onChange={(e) => setFolderPosition(parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </>
              )}

              {/* File content */}
              {newItemType === 'file' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Carpeta destino
                    </label>
                    <select
                      value={selectedParentFolder}
                      onChange={(e) => setSelectedParentFolder(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">📄 Raíz del proyecto (docs/)</option>
                      {items
                        .filter(item => item.type === 'folder')
                        .map(folder => (
                          <option key={folder.id} value={folder.name}>
                            📁 {folder.name}
                          </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">
                      Selecciona en qué carpeta se creará el archivo markdown
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contenido Markdown
                    </label>
                    <textarea
                      value={fileContent}
                      onChange={(e) => setFileContent(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                      placeholder="# Título del documento&#10;&#10;Contenido en markdown..."
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {editingItem ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl font-medium hover:bg-gray-700 transition-all duration-200"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={addItem}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    {newItemType === 'folder' ? (
                      <FolderPlus className="w-5 h-5 mr-2" />
                    ) : (
                      <FileText className="w-5 h-5 mr-2" />
                    )}
                    Agregar {newItemType === 'folder' ? 'Carpeta' : 'Archivo'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Vista Previa ({items.length} elementos)
              </h2>
              {items.length > 0 && (
                <button
                  onClick={generateFiles}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generar Archivos
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No hay elementos agregados</p>
                  <p className="text-sm">Agrega carpetas y archivos para comenzar</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-700 rounded-xl border border-gray-600"
                  >
                    <div className="flex items-center space-x-3">
                      {item.type === 'folder' ? (
                        <FolderPlus className="w-6 h-6 text-blue-500" />
                      ) : (
                        <FileText className="w-6 h-6 text-green-500" />
                      )}
                      <div>
                        <h3 className="font-medium text-white">
                          {item.parentFolder ? `${item.parentFolder}/` : ''}{item.name}{item.type === 'file' ? '.md' : ''}
                        </h3>
                        {item.type === 'folder' && (
                          <>
                            <p className="text-sm text-gray-400">
                              Posición: {item.position}
                            </p>
                            <p className="text-xs text-gray-500">
                              📁 Generará: _category_.json
                            </p>
                          </>
                        )}
                        {item.type === 'file' && (
                          <p className="text-sm text-gray-400">
                            📍 Destino: {item.parentFolder ? `docs/${item.parentFolder}/` : 'docs/'}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editItem(item.id)}
                        className="p-2 text-blue-600 hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-900/20 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
