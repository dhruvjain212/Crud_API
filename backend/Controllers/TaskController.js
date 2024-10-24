const UserModel = require("../Models/User")

const addTask = async (req, res)=>{
    const body = req.body;
    const{_id} = req.user;
    // console.log(body, _id);
    // res.send("successfull added task")
    try{
        const userData = await UserModel.findByIdAndUpdate(
            _id,// it is user id
            {
                $push: {tasks: body}
            },
            { new: true}//it returns the updated document to the user
        );
        return res.status(200).json({
            message:"task added successfully",
            success: true,
            data: userData?.tasks  
        })
    }catch(err){
        return res.status(500).json({
            message: " Something went wrong! ",
            error: err,
            success: false
        })
    }
}

const fetchTask = async (req, res)=>{
    const body = req.body
    const {_id} = req.user
    // console.log(body, _id)
    // res.send("successfully added task!")
    try{
        const userData = await UserModel.findById(_id).select('tasks')

        return res.status(200).json({
            message:"tasks fetched successfully",
            success: true,
            data: userData?.tasks  
        })
    }catch(err){
        return res.status(500).json({
            message: " Something went wrong! ",
            error: err,
            success: false
        })
    }
}

const deleteTask = async(req, res)=>{
    const {_id} = req.user
    const {taskId} = req.params
     console.log( _id, taskId)
    // res.send("successfully deleted expenses!")
    try{
        const userData = await UserModel.findByIdAndUpdate(
            _id,// it is user id
            {
                $pull: {tasks: {_id: taskId}}  //expense will be pulled(i.e. deleted) from expense array from db
            },
            { new: true}//it returns the updated document to the user
        );
        return res.status(200).json({
            message:"Task deleted successfully",
            success: true,
            data: userData?.tasks  
        })
    }catch(err){
        return res.status(500).json({
            message: " Something went wrong! ",
            error: err,
            success: false
        })
}
}

const editTask = async (req, res) => {
    const { _id } = req.user; // User ID from authenticated user
    const { taskId } = req.params; // Task ID from the request params
    const updatedTask = req.body; // Updated task details from request body

    try {
        // Find the user and the task within their tasks array by taskId
        const userData = await UserModel.findOneAndUpdate(
            { _id, "tasks._id": taskId }, // Find the user and the task within the tasks array
            {
                $set: {
                    "tasks.$": updatedTask // Use the positional operator to update the specific task
                }
            },
            { new: true } // Return the updated document
        );

        if (!userData) {
            return res.status(404).json({
                message: "Task not found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Task updated successfully",
            success: true,
            data: userData?.tasks
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong!",
            error: err,
            success: false
        });
    }
};


module.exports = {
    addTask,
    fetchTask,
    deleteTask,
    editTask
}