import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToDoABI } from "./abi/ToDoABI";

function ToDo() {

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    const contractAddress =
        "CONTRACT ADDRESS";

    const addTask = async () => {

        if (!task.trim()) return;

        const provider =
            new ethers.BrowserProvider(window.ethereum);

        const signer =
            await provider.getSigner();

        const contract =
            new ethers.Contract(
                contractAddress,
                ToDoABI,
                signer
            );

        const tx =
            await contract.addTask(task);

        await tx.wait();

        setTask("");

        loadTasks();
    };

    const loadTasks = async () => {

        const provider =
            new ethers.BrowserProvider(window.ethereum);

        const contract =
            new ethers.Contract(
                contractAddress,
                ToDoABI,
                provider
            );

        const count =
            await contract.getTaskCount();

        let taskList = [];

        for (
            let i = 0;
            i < Number(count);
            i++
        ) {

            const item =
                await contract.tasks(i);

            taskList.push(item);
        }

        setTasks(taskList);
    };

    const toggleTask = async (id) => {

        const provider =
            new ethers.BrowserProvider(window.ethereum);

        const signer =
            await provider.getSigner();

        const contract =
            new ethers.Contract(
                contractAddress,
                ToDoABI,
                signer
            );

        const tx =
            await contract.toggleTask(id);

        await tx.wait();

        loadTasks();
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>

            <h2>ToDo App</h2>

            <input
                type="text"
                placeholder="Enter a Task"
                value={task}
                onChange={(e) =>
                    setTask(e.target.value)
                }
            />

            <button onClick={addTask}>
                Add Task
            </button>

            <ul>

                {tasks.map((item, index) => (

                    <li key={index}>

                        <strong>
                            {item.task}
                        </strong>

                        {" - "}

                        {
                            item.completed
                                ? "✅ Completed"
                                : "⏳ Pending"
                        }

                        <button
                            onClick={() =>
                                toggleTask(index)
                            }
                        >
                            Toggle Task
                        </button>

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default ToDo;
