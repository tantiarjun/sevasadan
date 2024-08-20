import Article from '../models/newsModel.js';
import { uploadImage, getImageUrl } from './s3Controller.js';

const addNews = async (req, res) => {
  try {
    const { date, author, views, likes, title, summary, content } = req.body;
    const imageFile = req.file; 

    // const imageKey = await uploadImage(imageFile);
    // const imageUrl = await getImageUrl(imageKey);

    const newArticle = new Article({
        // image: imageUrl,
        image: 'dummy-url',
        date,
        author,
        views,
        likes,
        title,
        summary,
        content
    });

    const savedArticle = await newArticle.save();
    res.status(201).send(savedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  const { date, author, views, likes, title, summary, content } = req.body;
  const imageFile = req.file; 

  try{
    let imageKey;
    if(imageFile){
      imageKey = await uploadImage(imageFile);
    }

    const updatedFields = {
      date, author, views, likes, title, summary, content
    };

    if(imageKey){
      updatedFields.image = getImageUrl(imageKey);
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if(!updatedArticle){
      return res.status(404).send({ message: 'Article not found' });
    }

    res.status(200).send({ message: 'Article updated successfully', article: updatedArticle });
  }
  catch(error){
    console.error(error);
    res.status(500).send({ message: error.message });
  }
  
};

const getAllNews = async (req, res) => {
  try {
    const News = await Article.find();
    return res.status(200).json(News);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send({ message: 'Article not found' });
    }
    return res.status(200).json(article);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).send({ message: 'Article not found' });
    }
    return res.status(200).send({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export { addNews, updateNews, getAllNews, getNewsById, deleteNews };