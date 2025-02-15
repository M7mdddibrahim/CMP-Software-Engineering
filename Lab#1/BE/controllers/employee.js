const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const {id}=req.params.id;
  const index=employee.filter((emp)=>emp.id!==id);
  if (index !=-1)
  {
    employee.splice(index,1);
    res.status(200).json({data:employee});
  }
  else
  {
    res.status(404).json({message:"Employee not found"});
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const {id,name}=req.body;
  const newEmployee={id,name};
  employee.push(newEmployee);
  res.status(201).json({data:employee});
};
