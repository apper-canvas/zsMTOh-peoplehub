import { useState } from "react";
import { X, Upload, File } from "lucide-react";
import { motion } from "framer-motion";

const UploadDocumentModal = ({ onClose, onUpload, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: categories[0] || "General",
    file: null
  });
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        name: file.name, // Auto-fill name with file name
        file: file
      }));
      
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: null
        }));
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        name: file.name, // Auto-fill name with file name
        file: file
      }));
      
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: null
        }));
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Document name is required";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    if (!formData.file) {
      newErrors.file = "Please select a file";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onUpload(formData);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div 
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          className="relative bg-white dark:bg-surface-800 rounded-lg max-w-2xl w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-surface-200 dark:border-surface-700">
            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100">Upload New Document</h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-150"
            >
              <X size={20} className="text-surface-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-5">
              {/* File Upload Area */}
              <div>
                <label className="label">Upload File</label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging 
                      ? 'border-primary bg-primary/5' 
                      : 'border-surface-300 dark:border-surface-600'
                  } ${
                    errors.file ? 'border-red-500 dark:border-red-500' : ''
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  {formData.file ? (
                    <div className="flex flex-col items-center">
                      <File size={40} className="text-primary mb-2" />
                      <p className="text-surface-900 dark:text-surface-100 font-medium">{formData.file.name}</p>
                      <p className="text-surface-500 text-sm mt-1">
                        {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button 
                        type="button"
                        className="mt-4 text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light"
                        onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                      >
                        Choose a different file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload size={40} className="text-surface-400 mb-2" />
                      <p className="text-surface-700 dark:text-surface-300 font-medium">
                        Drag and drop your file here
                      </p>
                      <p className="text-surface-500 text-sm mt-1">or</p>
                      <label className="mt-4 btn btn-outline cursor-pointer">
                        Browse Files
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange} 
                        />
                      </label>
                    </div>
                  )}
                </div>
                {errors.file && (
                  <p className="mt-1 text-sm text-red-500">{errors.file}</p>
                )}
              </div>
              
              {/* Document Name */}
              <div>
                <label htmlFor="name" className="label">Document Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Enter document name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              
              {/* Document Description */}
              <div>
                <label htmlFor="description" className="label">Description (Optional)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input min-h-24"
                  placeholder="Enter document description"
                />
              </div>
              
              {/* Document Category */}
              <div>
                <label htmlFor="category" className="label">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`input ${errors.category ? 'border-red-500 dark:border-red-500' : ''}`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>
            </div>
            
            <div className="mt-8 flex justify-end space-x-3">
              <button 
                type="button"
                onClick={onClose}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
              >
                <Upload size={18} className="mr-2" />
                Upload Document
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;