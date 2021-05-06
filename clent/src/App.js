import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Table } from "react-bootstrap";

function App() {
  const [details, setDetails] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:5000/").then((response) => {
      setDetails(response.data);
      console.log(response.data);
    });
  }, []);

  const passUrl = () => {
    Axios.post("http://localhost:5000/shortUrls", {
      newUrl: newUrl,
    });
  };
  return (
    <div className="App">
      <Container>
        <h1>URL Shrinker</h1>
        <form onSubmit={passUrl}>
          <label for="fullUrl" class="sr-only">
            Url
          </label>
          <input
            required
            placeholder="Url"
            type="url"
            name="fullUrl"
            id="fullUrl"
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button class="btn btn-success" type="submit">
            Shrink
          </button>
        </form>

        <Table responsive="lg">
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
            </tr>
          </thead>
          {details.map((val, key) => {
            return (
              <div key={key}>
                <tbody>
                  <tr>
                    <td>
                      <a href={val.full}>{val.full}</a>
                    </td>
                    <td>
                      <a href={val.full}>{val.short}</a>
                    </td>
                  </tr>
                </tbody>
              </div>
            );
          })}
        </Table>
      </Container>
    </div>
  );
}

export default App;
