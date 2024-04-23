import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../BodyContent/bodyContent.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Navbar from "../Nav/navbar";
import { Link } from "react-router-dom";

import {
  fetchTodo,
  apiAddTodo,
  apiDeleteTodo,
  apiUpdateTodo,
  fetchAllTodos,
} from "../Api/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const BodyContent = () => {
  const [status1, setStatus1] = useState("");
  const [todoIdEdit, setTodoIdEdit] = useState(0);
  const [titleEdit, setTitleEdit] = useState("");
  const [detailedTodoEdit, setDetailedTodoEdit] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleStatusChange = (event) => {
    setStatus1(event.target.value);
  };
  const token = localStorage.getItem("token");

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["tododata"],
    queryFn: () => fetchAllTodos(token),
  });
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    // Check if data exists and is not loading or in error state
    if (data && !isLoading && !isError) {
      // Update filteredTasks with data
      setFilteredTasks(data);
    }
  }, [data, isLoading, isError]);
  const {
    mutate,
    isError: isPostError,
    isPending,
  } = useMutation({
    queryKey: ["addData"],
    mutationFn: (todoData) => apiAddTodo(todoData, token),
    // queryKey: ["deleteData"],
    // mutationFn: () => apiDeleteTodo(),
  });
  // console.log(data,isLoading ,error)
  const currentDate = new Date();

  // Format the date as needed
  const formattedDate = currentDate.toDateString();

  const addTodo = (p) => {
    // p.preventDefault();
    const todoData = {
      todo: p.target[0].value,
      detailedTodo: p.target[1].value,
      status: status1,
      date: formattedDate,
    };
    // apiAddTodo(todoData, token)
    mutate(todoData);
  };

  const todoDelete = (p) => {
    const isConfirmed = window.confirm("Do you want to delete?");
    if (isConfirmed) {
      apiDeleteTodo(p.target.id, token);
      setShowAlert(true);
      // for alert set only html below
      window.location.reload();
    } else {
      // Cancel action, do nothing
    }
  };

  const todoUpdate = (p) => {
    // p.preventDefault();

    // console.log(p.target)
    const todoData = {
      todoId: todoIdEdit,
      todo: p.target[0].value,
      detailedTodo: p.target[1].value,
      status: status1,
      date: formattedDate,
    };
    apiUpdateTodo(todoData, token);
  };

  const editUpdateTodoId = (p) => {
    console.log(p.todoId);
    setTodoIdEdit(p.todoId);
    setTitleEdit(p.todo);
    setDetailedTodoEdit(p.detailedTodo);
  };
  const handleTitleChange = (event) => {
    setTitleEdit(event.target.value); // Update title when input changes
  };
  const handleDetailedTodoChange = (event) => {
    setDetailedTodoEdit(event.target.value);
  };
  // useEffect(fetchAllTodos,[]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleItemClick = (option) => {
    setSelectedOption(option);
    // fetchFilterTodo(option,token);
    setFilteredTasks(
      option === "All" ? data : data.filter((p) => p.status === option)
    );
    
    // console.log(filteredTasks)
  };
  useEffect(() => {
    let timeoutId;
    if (showAlert) {
      timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [showAlert]);
  const [expiredStatus, setExpiredStatus] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`/home/isTokenExpired?token=${token}`, {
            method: "GET",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              mode: "no-cors",
            },
          });

          const data = await response.json();
          console.log(data);
          if (!data) {
            console.log("expiredStatus");
            setExpiredStatus(true); // Token is not expired
          }
        } catch (error) {
          // Error is caught silently without logging
          setExpiredStatus(false); // Token is expired
        }
      } else {
        setExpiredStatus(false);
        window.location.href = "/";
      }
    };

    checkTokenValidity();
  }, []);
  return (
    <>
      {!expiredStatus ? (
        <h1>
          Session expired please <Link to="/">login</Link>!!
        </h1>
      ) : (
        <>
          <Navbar />
          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "105px",
            }}
          >
            <div className="headerTodo">
              <div className="headerTodo2" style={{}}>
                <h1 style={{ color: "#ff0000" }}>TODO's Here !!</h1>
                {/* /////////////////////////////////////modals////////////////////////////////////////////////////////////// */}
                <div
                  className="modal fade"
                  id="exampleModal2"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Update Todos
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          style={{
                            border: "1px white",
                            backgroundColor: "white",
                            fontSize: "20px",
                          }}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={todoUpdate}>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Enter title</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter title"
                              name="title"
                              value={titleEdit}
                              onChange={handleTitleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">
                              Detailed todo
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Detailed todo"
                              name="detailed"
                              value={detailedTodoEdit}
                              onChange={handleDetailedTodoChange}
                              required
                            />
                          </div>
                          <p style={{ marginTop: "20px" }}>Status</p>

                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="status"
                              value="completed"
                              onChange={handleStatusChange}
                              required
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Completed
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="status"
                              value="inProgress"
                              onChange={handleStatusChange}
                              required
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault2"
                            >
                              In _progress
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="status"
                              value="todo"
                              onChange={handleStatusChange}
                              required
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault3"
                            >
                              Todo
                            </label>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              style={{
                                padding: "6px",
                                backgroundColor: "#ff0000",
                                color: "white",
                                border: "1px solid #ff0000",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Add Todos
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                          style={{
                            border: "1px white",
                            backgroundColor: "white",
                            fontSize: "20px",
                          }}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={addTodo}>
                          <div className="form-group">
                            <label for="exampleInputEmail1">Enter title</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter title"
                              name="title"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label for="exampleInputPassword1">
                              Detailed todo
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Detailed todo"
                              name="detailed"
                              required
                            />
                          </div>
                          <p style={{ marginTop: "20px" }}>Status</p>

                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="status"
                              value="completed"
                              onChange={handleStatusChange}
                              required
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Completed
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="status"
                              value="inProgress"
                              onChange={handleStatusChange}
                              required
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault2"
                            >
                              In_progress
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="status"
                              value="todo"
                              onChange={handleStatusChange}
                              required
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault3"
                            >
                              Todo
                            </label>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              style={{
                                padding: "6px",
                                backgroundColor: "#ff0000",
                                color: "white",
                                border: "1px solid #ff0000",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /////////////////////////////////////modals////////////////////////////////////////////////////////////// */}

                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="dropdown">
                    <button
                      className="todoButtons dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {selectedOption || "Filter Todos"}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <span
                        className="dropdown-item"
                        onClick={() => handleItemClick("completed")}
                      >
                        completed
                      </span>
                      <span
                        className="dropdown-item"
                        onClick={() => handleItemClick("inProgress")}
                      >
                        inProgress
                      </span>
                      <span
                        className="dropdown-item"
                        onClick={() => handleItemClick("todo")}
                      >
                        todo
                      </span>
                      <span
                        className="dropdown-item"
                        onClick={() => handleItemClick("All")}
                      >
                        All
                      </span>
                      {/* <hr/> */}
                    </div>
                  </div>
                  <div>
                    <button
                      data-toggle="modal"
                      data-target="#exampleModal"
                      style={{
                        padding: "7px",
                        backgroundColor: "#ff0000",
                        color: "white",
                        border: "1px solid #ff0000",
                        borderRadius: "3px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Add Todo
                    </button>
                  </div>
                </div>
              </div>
              {isLoading && <h1>Loading...</h1>}
              {isError && <h1>Error...</h1>}

              {filteredTasks?.length == 0 && (
                <p>
                  No todo's to display or click on filter to see categories!
                </p>
              )}

              {filteredTasks?.map((p, ind) => {
                return (
                  <>
                    <hr />
                    <div style={{ margin: "30px 0" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span
                            style={{ fontSize: "22px", marginRight: "20px" }}
                          >
                            {p.todo}
                          </span>
                        </div>
                      </div>

                      <p>{p.detailedTodo}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <button
                            className="todoButtons"
                            data-toggle="modal"
                            data-target="#exampleModal2"
                            onClick={() => editUpdateTodoId(p)}
                          >
                            Edit
                          </button>
                          <p
                            className="todoButtons"
                            id={p.todoId}
                            onClick={todoDelete}
                          >
                            Delete
                          </p>
                        </div>
                        <div>
                          <div className={p.status}>{p.status}</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BodyContent;
