import React, { Component } from "react";
import "./App.css";
import httpService from "./services/httpService";
import config from "./config.json";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await httpService.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = {
      title: "a",
      body: "b",
    };
    const { data: post } = await httpService.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
    console.log(post);
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await httpService.put(config.apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...posts };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPost = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await httpService.delete(config.apiEndpoint + "/" + post.id);
    } catch (er) {
      //expected (404:not found, 400: bad request) - CLIENT ERRORS
      //  -display a specific error message
      if (er.response && er.response.status === 404)
        alert("This post was not found");
      //unexpected (network down, server down, db down, bug in code)
      //  -Log them
      //  -Generic and friendly error message

      this.setState({ posts: originalPost });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
