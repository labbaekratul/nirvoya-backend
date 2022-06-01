const AdminRole = require("../models/adminRoleSchema");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/authAndValidation");

// Get all the Role data
exports.allRole = expressAsyncHandler(async (req, res) => {
  const admins = await AdminRole.find({});
  res.send(admins);
});

//Single Role details
exports.singleRole = expressAsyncHandler(async (req, res) => {
  const role = await AdminRole.findById(req.params.id);

  if (role) {
    res.send(role);
  } else {
    res.status(404).send({ message: "Role not fount" });
  }
});

//Create New Role
exports.createRole = expressAsyncHandler(async (req, res) => {
  const role = new AdminRole({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 8),
    position: req.body.position,
    role: req.body.role,
    isAdmin: req.body.isAdmin,
  });
  const createdRole = await role.save();
  res.send({
    _id: createdRole._id,
    firstName: createdRole.firstName,
    lastName: createdRole.lastName,
    email: createdRole.email,
    phone: createdRole.phone,
    password: bcrypt.hashSync(req.body.password, 8),
    role: createdRole.position,
    position: createdRole.role,
    isAdmin: this.createRole.isAdmin,
    token: generateToken(createdRole),
  });
});

//Role SignIn
exports.singIn = expressAsyncHandler(async (req, res) => {
  const role = await AdminRole.findOne({
    $or: [{ phone: req.body.phone }, { email: req.body.email }],
  });

  if (role) {
    if (bcrypt.compareSync(req.body.password, role.password)) {
      res.send({
        _id: role._id,
        firstName: role.firstName,
        lastName: role.lastName,
        email: role.email,
        phone: role.phone,
        password: role.password,
        image: role.image,
        address: role.address,
        position: role.position,
        company: role.company,
        role: role.role,
        isAdmin: role.isAdmin,
        token: generateToken(role),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

//Role Data Detail Update
exports.updateRole = expressAsyncHandler(async (req, res) => {
  const roleId = req.params.id;
  const Role = await AdminRole.findById(roleId);
  if (Role) {
    Role.firstName = req.body.firstName;
    Role.lastName = req.body.lastName;
    Role.email = req.body.email;
    Role.phone = req.body.phone;
    Role.password = req.body.password;
    Role.image = req.body.image;
    Role.address = req.body.address;
    Role.position = req.body.position;
    Role.company = req.body.company;
    Role.role = req.body.role;
    const updatedRole = await Role.save();
    res.send({ message: "Role Updated", updatedRole });
  } else {
    res.status(404).send({ message: "Role Not Found" });
  }
});

// Delete Roles
exports.deleteRoles = expressAsyncHandler(async (req, res) => {
  const role = await AdminRole.findById(req.params.id);
  if (role) {
    const deleteRole = await role.remove();
    res.send({ message: "Role Deleted", color: deleteRole });
  } else {
    res.status(404).send({ message: "Role Not Found" });
  }
});
