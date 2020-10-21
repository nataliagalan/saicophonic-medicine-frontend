<Form.Row>
<Col>
  <Form.Control 
    name="timestamp" 
    value={this.state.timestamp} 
    onChange={this.handleChange}
    placeholder="Time" />
</Col>
<Col xs={7}>
  <Form.Control
    name="title" 
    value={this.state.title} 
    onChange={this.handleChange} 
    placeholder="Song Title" />
</Col>
</Form.Row>
<br></br>
<Form.Group controlId="exampleForm.ControlTextarea1">
<Form.Control 
  as="textarea"
  name="lyrics" 
  value={this.state.lyrics} 
  onChange={this.handleChange}
  placeholder="Lyrics"
  rows={11} />
</Form.Group>