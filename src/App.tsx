import React from "react";

interface Props {};
interface State {};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Looks like bundling is working</h1>
      </div>
    );
  }
}

export default App;
