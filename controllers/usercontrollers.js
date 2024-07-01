// import ObjectId  from `('mongodb').ObjectId`;
import usermodel from "../models/User.js"
const create = async (req, res) => {
  try {
    const { busstart, bus, price, quantity, time, ending, backgroundColor, numberplate, randomId } = req.body
    const Newuser = new usermodel({
      busstart, bus, price, quantity, time, ending, backgroundColor, numberplate, randomId
    })
    await Newuser.save()

    res.status(200).json({ success: true, message: "Record Added Successfully.", Newuser })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Interl server eror" })
  }
}

///////Read api in decending order
const get = async (req, res) => {

  try {
    const users = await usermodel.find().sort({ _id: -1 });
    if (!users) {
      return res.status(404).json({ success: false })
    }

    res.status(200).json({ users })
  } catch (error) {
    console.log(error)

    res.status(500).json({ success: false })
  }
}



///////Read api for single user
const getsingle = async (req, res) => {

  try {
    const users = await usermodel.find().sort({ _id: -1 }).limit(1);
    if (!users) {
      return res.status(404).json({ success: false })
    }

    res.status(200).json({ users })
  } catch (error) {
    console.log(error)

    res.status(500).json({ success: false })
  }
}





///////Read api for single user
const getsingledata = async (req, res) => {

  try {
    const _id = req.params._id
    // console.log(userId)
    // const users = await usermodel.findOne(userId,req.body , {new:true})
    const users = await usermodel.findOne({ _id: _id})
    if (!users) {
      return res.status(404).json({ success: false })
    }

    res.status(200).json({ users })
  } catch (error) {
    console.log(error)

    res.status(500).json({ success: false })
  }
}

////////update user api
const Updated = async (req, res) => {
  try {
    const userId = req.params.id

    const updateuser = await usermodel.findByIdAndUpdate(userId, req.body, { new: true })
    if (!updateuser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'User updated successfully', updateuser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// delet user ap
const Delete = async (req, res) => {
  try {
    const userId = req.params.id
    const deletuser = await usermodel.findByIdAndDelete(userId)
    if (!deletuser) {
      return res.status(404).json({ success: false, message: 'user Not found' });
    }
    res.status(200).json({ success: true, message: 'user Deleted successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export { create, get, Updated, Delete, getsingle, getsingledata }



