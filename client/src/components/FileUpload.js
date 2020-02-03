import React from 'react';
import { CustomInput, Form, FormGroup, Label, Button, Container } from 'reactstrap';

const Example = ({ handleFileUpload, uploadFile })  => {
  return (
    <Container>
      <Form>
        <FormGroup>
          <Label for="exampleCustomFileBrowser">Select File to Upload </Label>
          <CustomInput 
            type="file" 
            id="exampleCustomFileBrowser" 
            name="customFile" 
            accept= {['.csv','.tsv']}
            onChange={handleFileUpload}
          />
      </FormGroup>
    </Form>
    <Button 
      color="secondary" 
      size="lg" 
      block
      onClick={uploadFile}
      >Upload</Button>
    </Container>
  );
}

export default Example;