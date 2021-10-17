import React from 'react';

import {ErrorImageContainer, ErrorImageText, ErrorImageOverlay} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
    constructor() {
        super();

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        
        return { hasError: true}
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        if(this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png'>
                        <ErrorImageText>Sorry this page is not working</ErrorImageText>
                    </ErrorImageContainer>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;