// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
// import Login from '@Login'

// export default function withAuthentication( WrappedComponent ) {
//     const WithAuthentication = ( props ) => {
//         if ( !props.isAuthenticated ) {
//             return <Redirect to={Login.path} />
//         }

//         return ( <WrappedComponent { ...props } /> )
//     }

//     const { bool } = PropTypes
//     WithAuthentication.propTypes = {
//         isAuthenticated: bool.isRequired,
//     }

//     const mapStateToProps = ( state ) => ( {
//         isAuthenticated: state.session.isAuthenticated,
//     } )

//     return connect( mapStateToProps )( WithAuthentication )
// }
