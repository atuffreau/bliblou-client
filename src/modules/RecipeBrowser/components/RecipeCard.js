import React, { Component } from "react";
import { string, object, arrayOf, func } from "prop-types";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import { MdInfoOutline} from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

import defaultImage from "../../../images/building.png";
import { RECIPE } from "../../../modules/Navigation";

class RecipeCard extends Component {
  constructor (props) {
    super(props);
    this.state = { overlay: false };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.cardImgContainer = React.createRef();
  }

  async componentDidMount () { 
    const { picture, thumbnails, loadPicture } = this.props;

    if (picture) {
      const src = await loadPicture(
        thumbnails.find(thumbnail => thumbnail.replace(/\..+$/, '')
                                              .split("_")[1]
                                              .split("x")
                                              .every((cur, index) => index === 0
                                                ? Number(cur) >= this.cardImgContainer.current.clientWidth
                                                : Number(cur) >= this.cardImgContainer.current.clientHeight))
        || picture
      );
      this.setState({ src });
    }
  }
  
  handleOnClick () {
    const overlay = !this.state.overlay;
    this.setState({ overlay });
  }

  render () {
    const { overlay, src } = this.state;
    const { recipeId, content: { title = "", description = "" } } = this.props;
    
    return (
      <Card bg="light">
        <NavLink to={ RECIPE.replace(":recipeId", recipeId) } >
          <div ref={ this.cardImgContainer }>
            <Card.Img src={ src || defaultImage } 
                      alt="Recipe image" 
                      className={ src ? undefined : "default-image"} />
          </div>
        </NavLink>
        <Card.Body>
          <MdInfoOutline className="icon icon-sm" onClick={ this.handleOnClick }/>
          <Card.Title as={ NavLink } to={ RECIPE.replace(":recipeId", recipeId) }>{ title }</Card.Title>
        </Card.Body>
        { !overlay
            ? <></> 
            : (<Card.ImgOverlay>
                <FaAngleDown className="icon icon-sm" onClick={ this.handleOnClick } />
                <NavLink to={ RECIPE.replace(":recipeId", recipeId) }>
                  { description 
                      ? <Card.Text>
                          { description.length > 230 
                            ? `${description.substring(0, 227)}...` 
                            : description }
                        </Card.Text>
                      : <></> }
                </NavLink>
              </Card.ImgOverlay>) }
      </Card>
    );
  }
}

RecipeCard.propTypes = {
  recipeId: string.isRequired,
  content: object.isRequired,
  picture: string,
  thumbnails: arrayOf(string),
  loadPicture: func.isRequired
};

RecipeCard.defaultProps = {
  picture: undefined,
  thumbnails: []
};

export default RecipeCard;
