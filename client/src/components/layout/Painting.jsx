import { Component } from "react";
import PropTypes from "prop-types";

class Painting extends Component {
    // handleClick = () => {
    //     this.props.addToOrder(this.props.index);
    // }   

    render() {
        const { image, name, price, desc } = this.props.details; // Destructure props for cleaner code

        return (
            
            <div>
                <li className="list-group-item d-flex flex-column align-items-start">
                <div className="d-flex justify-content-between w-100">
                    <img src={image} alt={name} className="img-fluid mb-2" style={{ maxWidth: '150px', height: 'auto' }} />
                    <div className="ms-3">
                        <h3 className="h5">{name}</h3>
                        <span className="badge bg-primary">{price}</span>
                    </div>
                </div>
                <p className="mt-2">{desc}</p>
                {status === "available" && (
                    {/* <button 
                        className="btn btn-success"
                        onClick={this.handleClick}
                    >
                        Add to Order
                    </button> */}
                )}
            </li>
            painting component</div>
        );
    }
}

// Adding PropTypes validation
Painting.propTypes = {
    details: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        desc: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired,
    addToOrder: PropTypes.func.isRequired, // addToOrder should be a function
    index: PropTypes.string.isRequired, // index should be a string (assuming keys in parent component)
};

export default Painting;
