import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", color: "red", backgroundColor: "#fef2f2", minHeight: "100vh" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Application Error</h1>
          <pre style={{ marginTop: "1rem", whiteSpace: "pre-wrap", backgroundColor: "white", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #fca5a5", fontSize: "14px" }}>
            {this.state.error?.message}
            <br />
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
