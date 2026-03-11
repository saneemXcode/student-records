function StudentTable({students,deleteStudent,setEditingStudent}){

return(

<table border="1" width="100%">

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Age</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{students.map((s)=>(

<tr key={s.id}>

<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.age}</td>

<td>

<button onClick={()=>setEditingStudent(s)}>
Edit
</button>

<button onClick={()=>deleteStudent(s.id)}>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

);

}

export default StudentTable;