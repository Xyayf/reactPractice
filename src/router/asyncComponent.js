import React from 'react'

export default loadComponent => {
    return   class AsyncComponent extends React.Component {
        state = {
            Component: null
        }
        async componentDidMount() {
            if (this.state.Component !== null) return
            
            try {
                const {default: Component} = await loadComponent()
                this.setState({ Component })
            }catch (err) {
                console.error('Cannot load component in <AsyncComponent />');
                throw err
            }
           
        }

        render() {
            const { Component } = this.state
            return (Component) ? <Component {...this.props} /> : null
        }
    }
}
    
  

