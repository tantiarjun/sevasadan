import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sectionDataSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: false, // Ensure id is not unique
  },
  type: {
    type: String, 
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Schema.Types.Mixed,
    required: false, // Make content optional
  },
  className: {
    type: String,
    required: false,
  },
  imgSrcs: {
    type: [String],
    required: false,
  }
});

// Define Doctor Profile Schema
const doctorProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  doctorUnit: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  }
});

// Define Doctor Schema incorporating SectionData and DoctorProfile as subdocuments
const doctorSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  speciality: { type: String, required: true },
  description: { type: String, required: true },
  profile: doctorProfileSchema, // Embedding DoctorProfile
  sections: [sectionDataSchema], // Embedding SectionData
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;

// import mongoose from 'mongoose';

// const DoctorSchema = new mongoose.Schema({
//   image: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   unit: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   speciality: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   qualifications: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   experience: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   languages: {
//     type: [String],
//     required: true,
//   },
//   contactNumber: {
//     type: String,
//     required: true,
//     trim: true,
//   }
// });

// // module.exports = mongoose.model('Doctor', DoctorSchema);
// const Doctor = mongoose.model('Doctor', DoctorSchema);

// export default Doctor;
