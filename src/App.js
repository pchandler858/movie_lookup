import React, { Component } from "react";
import "./App.css";
import MovieRow from './MovieRow'
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log('this is my initializer')

    // const movies = [
    //   { id: 0, poster_src: "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg", title: "Avengers", overview: "Esse veniam duis proident ex officia irure commodo excepteur voluptate ipsum. Anim quis deserunt excepteur veniam quis excepteur proident exercitation exercitation quis adipisicing. Commodo cillum irure aute excepteur voluptate. Eu sint id excepteur nostrud cillum cillum. Reprehenderit esse officia laborum velit sunt enim pariatur incididunt commodo ipsum. Velit nulla consequat sit aute labore proident eiusmod aliqua fugiat officia non. Quis laboris nulla irure nisi id culpa non ullamco sint minim proident laboris." },
    //   { id: 1, poster_src: "https://img06.mgo-images.com/image/thumbnail?id=MMV63AB6961D9B21BCF8CC32B7FDFC3CF074&ql=70&sizes=310x465", title: "Robin Hood", overview: "Esse veniam duis proident ex officia irure commodo excepteur voluptate ipsum. Anim quis deserunt excepteur veniam quis excepteur proident exercitation exercitation quis adipisicing. Commodo cillum irure aute excepteur voluptate. Eu sint id excepteur nostrud cillum cillum. Reprehenderit esse officia laborum velit sunt enim pariatur incididunt commodo ipsum. Velit nulla consequat sit aute labore proident eiusmod aliqua fugiat officia non. Quis laboris nulla irure nisi id culpa non ullamco sint minim proident laboris." }
    // ]

    //   let movieRows = []
    //   movies.forEach((movie) => {
    //     console.log(movie.title)
    //     const movieRow = <MovieRow movie={movie} />
    //     movieRows.push(movieRow)
    //   })
    //   this.state = { rows: movieRows }

    // this.performSearch("hustle")
  }

  performSearch(searchTerm) {
    console.log('perform search using moviedb')
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=9467f9a7dc0cb6861c7460249bf2f7fe&language=en-US&include_adult=false&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log('Fetched data successfully')
        const results = searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie} />
          movieRows.push(movieRow)
        })

        this.setState({ rows: movieRows })

      },
      error: (xhr, status, error) => {
        console.log('Failed to fetch data')
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }


  render() {
    return (
      <div >
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img width="50" src="icon.png" alt="movie db icon" />
              </td>
              <td width='8' />
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: '99%',
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" type="text" />

        {this.state.rows}

      </div >
    )
  }
}

export default App;
