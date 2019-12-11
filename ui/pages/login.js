import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import useForm from "react-hook-form";
import Card from "../components/styled/Card";
import Form from "../components/styled/Form";

const SEND_MAGIC_LINK_MUTATION = gql`
  mutation SendMagicLink($email: String!, $eventId: ID!) {
    sendMagicLink(email: $email, eventId: $eventId)
  }
`;

export default ({ currentUser, event }) => {
  if (!event) return <div>redirect!</div>;
  const [sendMagicLink, { data, loading }] = useMutation(
    SEND_MAGIC_LINK_MUTATION
  );
  const { handleSubmit, register, errors } = useForm();

  if (currentUser) {
    return <Card>You are logged in as {currentUser.email}.</Card>;
  }

  return (
    <Card>
      <h1>Log in or sign up with magic link</h1>

      {data && data.sendMagicLink ? (
        <div>Magic link sent! Check your inbox!</div>
      ) : (
        <Form
          onSubmit={handleSubmit(({ email }) => {
            sendMagicLink({ variables: { email, eventId: event.id } });
          })}
        >
          <label htmlFor="email">Email</label>
          <input
            name="email"
            disabled={loading}
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address"
              }
            })}
          />
          {errors.email && email.title.message}

          <button type="submit">Send</button>
        </Form>
      )}
    </Card>
  );
};
