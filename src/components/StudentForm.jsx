import { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent, updateStudent }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const newErrors = { ...errors };

    // Name validation
    if (name === "name") {
      const onlyLetters = /^[A-Za-z\s]*$/;
      if (!onlyLetters.test(value)) {
        newErrors.name = "Name should contain only letters";
      } else {
        delete newErrors.name;
      }
    }

    // Age validation
    if (name === "age") {
      if (!/^[0-9]*$/.test(value)) {
        newErrors.age = "Age must contain only numbers";
      } else if (value <= 0 && value !== "") {
        newErrors.age = "Age must be greater than 0";
      } else {
        delete newErrors.age;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name) newErrors.name = "Please enter name";
    if (!form.age) newErrors.age = "Please enter age";
    if (!form.email) {
      newErrors.email = "Please enter email";
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(form.email)) newErrors.email = "Enter valid email";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (editingStudent) updateStudent(form);
    else addStudent(form);

    setForm({ name: "", age: "", email: "" });
    setErrors({});
      setTimeout(() => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
        <div className="form">

       
      <div className="input-box">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <label className={form.name ? "active" : ""}>Name</label>
        <div className="input-line"></div>
      </div>
      {errors.name && <p className="error-text">{errors.name}</p>}

      <div className="input-box">
        <input
          type="text"
          name="age"
          value={form.age}
          onChange={handleChange}
        />
        <label className={form.age ? "active" : ""}>Age</label>
        <div className="input-line"></div>
      </div>
      {errors.age && <p className="error-text">{errors.age}</p>}

      <div className="input-box">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label className={form.email ? "active" : ""}>Email</label>
        <div className="input-line"></div>
      </div>
      {errors.email && <p className="error-text">{errors.email}</p>}

      <button type="submit" className="btn">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
       </div>
    </form>
  );
}

export default StudentForm;