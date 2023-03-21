import { Component } from "react";


export default class ErrorBoundary extends Component{
   state = {
    hasError: false,
  };

   static getDerivedStateFromError(_) {
    return { hasError: true };
  }

   componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

   render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}