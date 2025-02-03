import { useState, useEffect } from 'react';
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ item, setItem }) => {
  // 1. Create a state for the form
  // 2. Create a function to handle the form submission
  // 3. Create a function to handle the form input changes

  const [formData, setFormData] = useState({
    name: item?.name || '',
    status: item?.status || 'closed',  
  });
  const [status, setStatus] = useState(null);  

  useEffect(() => {
    setFormData({
      name: item?.name || '',
      status: item?.status || 'closed',  
    });
    setStatus(null);  
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Updating...'); 

    try {
      const response = await fetch(`${API_URI}/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`);
      }

      const updatedItem = await response.json();
      setItem(updatedItem);
      const successMessage = 'Update successful!';
      setStatus(successMessage); 
      console.log(successMessage);  
      alert(successMessage);  
    } catch (err) {
      console.error(err);
      const errorMessage = `Error: ${err.message}`;
      setStatus(errorMessage);  
      console.error(errorMessage);  
      alert(errorMessage);  
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Door Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter door name"
          required
        />
      </div>

      <div>
        <label htmlFor="status">Door Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <button type="submit">Update</button>

      {status && <p>{status}</p>}  
    </form>
  );
};

export default UpdateItem;

