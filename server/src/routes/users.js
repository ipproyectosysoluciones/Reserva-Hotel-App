const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const { Users } = require('../config/db')
const { createUser, updateUsers, login, getUsers, logout } = require('../controllers/usersControllers')
const { verifyToken } = require('../middlewares/tokenAuthentication')
const { transporter } = require( '../controllers/sendMailController' );
const { log } = require("console");
require( 'dotenv' ).config();



function generateVerificationCode() {
  return crypto.randomBytes(3).toString('hex');
}

router.post('/', async (req, res) => {
  try {
    const { password, email, name, mode, encrypted_email, photo } = req.body;

    const existingUser = await Users.findOne({
      where: {
        email: email
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Ya existe ese mail" });
    }
      
      const newUser = await createUser(password, email, name, photo, mode, encrypted_email);

      if (newUser.error) {
        res.render('pages/404.ejs', { newUser, title: 'Hotel Backend' });
      } else {
        const verificationCode = generateVerificationCode();

        await newUser.update({
          verificationCode: verificationCode,
        });

        let subject = "NUEVA CUENTA";
        let text = `Su cuenta ha sido creada sin problemas! ¡Felicidades! por Name:${name} verifica tu código: ${verificationCode} `;

        transporter(email, subject, text)

        res.status(201).json(newUser);
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/verify', async (req, res) => {
  const { verificationCode } = req.body;

  try {
    const user = await Users.findOne({ where: { verificationCode } });
    if (user) {
      user.check = true;
      await user.save();
      res.status(200).json({ message: 'Es correcto', user });
    } else {
      res.status(400).json({ error: 'Código de verificación incorrecto.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {

    const { id } = req.params
    const { name, password, email, photo, mode, encrypted_email } = req.body

    const updatedUser = await updateUsers(id, name, password, email, photo, mode, encrypted_email)
    if (updatedUser.error) {
      res.render('pages/404.ejs', { updatedUser, title: 'Hotel Backend' });
    } else {
      res.status(201).json(updatedUser)
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const getUser = await login(email, password);
    
    if (getUser.error) {
      return res.status(400).json({ error: getUser.error });
    }
    
    if (getUser.user) {
      const user = await Users.findOne({ where: { verificationCode: getUser.user.verificationCode } });

      if (user) {
        if (user.check !== false && user.check !== null) {
          return res.status(201).json(getUser);
        } else {
          return res.status(400).json({ error: 'Código de verificación incorrecto.' });
        }
      } else {
        return res.status(400).json({ error: 'Código de verificación incorrecto.' });
      }
    } else {
      return res.status(201).json(getUser);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const getUser = await logout(userId);
    
    if (getUser.error) {
      return res.status(400).json({ error: getUser.error });
    }
    
    return res.status(201).json(getUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// router.get('/', async (req, res) => {
//   try {
//     const users = await getUsers();

//     if (users.error) {
//       return res.status(400).json({ error: users.error })
//     }

//     const responseData = { users, title: 'Hotel Backend' }

//     if (req.accepts('json')) {
//       res.json(users)
      
//     } else if (req.accepts('html')) {
//       res.render('pages/users.ejs', responseData)
//     } else {
//       res.status(406).send('Not Acceptable')
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


router.get('/', async (req, res) => {
    try {
       const users = await getUsers();
  
       if (users.error) {
      return res.status(400).json({ error: users.error })
      }
  
     
   if(users){
      res.json(users)
   }
        
   else {
        res.status(406).send('Not Acceptable')
       }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Dashboard admin only
router.get('/api', verifyToken, async (req, res) => {
  try {
    const users = await getUsers();

    if (users.error) {
      return res.status(400).json({ error: users.error })
    }

    const responseData = { users, title: 'Hotel Backend' }
    res.render('pages/users.ejs', responseData)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Baneo de usuarios
router.post('/api/ban/:id', async (req, res) => {
  try {
    const {id} = req.params

    const record = await Users.findByPk(id)

    if(!record){
      return res.status(404).send('Registro no encontrado')
    }

    const newBannedUser = !record.status
    await Users.update({status: newBannedUser}, {where: {id}})
    res.redirect('/users/api')
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


module.exports = router;