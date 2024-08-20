import Doctor from '../models/doctorModel.js';
import { uploadImage, getImageUrl } from './s3Controller.js';

const addDoctor = async (req, res) => {
  try {
    const { name, unit, speciality, description, profile, sections } = req.body;
    const imageFile = req.file; 

    const imageKey = await uploadImage(imageFile);
    const imageUrl = await getImageUrl(imageKey);

    const newDoctor = new Doctor({
      image: imageUrl,
      name,
      unit,
      speciality, 
      description,
      profile,
      sections
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).send(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  const { name, unit, speciality, description, profile, sections } = req.body;
  const imageFile = req.file; // New image might be optional

  try {
    let imageKey;
    if (imageFile) {
      imageKey = await uploadImage(imageFile);
    }

    const updatedFields = {
      name, unit, speciality, description, profile, sections
    };

    if (imageKey) {
      updatedFields.image = getImageUrl(imageKey);
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updatedDoctor) {
      return res.status(404).send({ message: 'Doctor not found' });
    }

    res.status(200).send({ message: 'Doctor updated successfully', doctor: updatedDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json(doctors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).send({ message: 'Doctor not found' });
    }
    return res.status(200).json(doctor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).send({ message: 'Doctor not found' });
    }
    return res.status(200).send({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor };

// import Doctor from '../models/doctorModel.js';
// import { uploadImage, getImageUrl } from './s3Controller.js';

// const addDoctor = async (req, res) => {
//   try {
//     const { name, unit, speciality, qualifications, experience, description, languages, contactNumber } = req.body;
//     const imageFile = req.file;

//     const imageKey = await uploadImage(imageFile);
//     const imageUrl = await getImageUrl(imageKey);

//     const newDoctor = new Doctor({
//       image: imageUrl,
//       name,
//       unit,
//       speciality,
//       qualifications,
//       experience,
//       description,
//       languages: languages.split(',').map(lang => lang.trim()), // assuming languages come as a comma-separated string
//       contactNumber,
//     });

//     const savedDoctor = await newDoctor.save();
//     res.status(201).send(savedDoctor);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: error.message });
//   }
// };

// const updateDoctor = async (req, res) => {
//   const { name, unit, speciality, qualifications, experience, description, languages, contactNumber } = req.body;
//   const imageFile = req.file;

//   try {
//     let imageKey;
//     if (imageFile) {
//       imageKey = await uploadImage(imageFile);
//     }

//     const updatedFields = {
//       name,
//       unit,
//       speciality,
//       qualifications,
//       experience,
//       description,
//       languages: languages.split(',').map(lang => lang.trim()), // assuming languages come as a comma-separated string
//       contactNumber,
//     };

//     if (imageKey) {
//       updatedFields.image = await getImageUrl(imageKey);
//     }

//     const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
//     if (!updatedDoctor) {
//       return res.status(404).send({ message: 'Doctor not found' });
//     }

//     res.status(200).send({ message: 'Doctor updated successfully', doctor: updatedDoctor });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: error.message });
//   }
// };

// const getAllDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     return res.status(200).json(doctors);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send({ message: error.message });
//   }
// };

// const getDoctorById = async (req, res) => {
//   try {
//     const doctor = await Doctor.findById(req.params.id);
//     if (!doctor) {
//       return res.status(404).send({ message: 'Doctor not found' });
//     }
//     return res.status(200).json(doctor);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send({ message: error.message });
//   }
// };

// const deleteDoctor = async (req, res) => {
//   try {
//     const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
//     if (!deletedDoctor) {
//       return res.status(404).send({ message: 'Doctor not found' });
//     }
//     return res.status(200).send({ message: 'Doctor deleted successfully' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send({ message: error.message });
//   }
// };

// export { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor };
