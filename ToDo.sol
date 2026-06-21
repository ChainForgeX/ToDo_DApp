//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ToDo{
    struct Task{
        string task;
        bool completed;
    }

    Task[] public tasks;

    function addTask(string memory _task) public{
        tasks.push(
            Task({
                task : _task,
                completed : false
            })
        );
    }

    function toggleTask (uint _id) public{
        tasks[_id].completed = !tasks[_id].completed;
    }

    function getTaskCount() public view returns(uint){
        return tasks.length;
    }
}