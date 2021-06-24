import React, { Component } from 'react';


class Uploaded extends Component {

  render() {
    const {project} = this.props;
    const related = project.relatedFile;
      return (
        <div className="section">
        { project && project.url.map((url, i) => {
          return(
            <li key={i}><a target='_blank' href={url} alt='relatedFile'>{related[i]}</a>
            </li> 
          )

        })}
        
      </div>
      )
      
}
};


export default Uploaded;
 
