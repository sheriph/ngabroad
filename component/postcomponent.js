import { Container } from "@material-ui/core";



const SinglePost = () => {
  return (
    <Container disableGutters style={{ marginTop: "20px" }}>
      <div
        dangerouslySetInnerHTML={{ __html: "<p class ='para'>Hello world!</p>" }}
      />
    </Container>
  );
};

export default SinglePost;
