import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import { Form, Label, Input, Button, Span, Text } from './RegisterForm.styled';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        role: form.elements.role.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <Label>
        <Text> Role</Text>
        <Input type="text" name="role" />
      </Label>
      <Label>
        <Text> Email</Text>
        <Input type="email" name="email" />
      </Label>
      <Label>
        <Text> Password</Text>
        <Input type="password" name="password" />
      </Label>
      <Button type="submit">
        Register
        <Span />
      </Button>
    </Form>
  );
};

export default RegisterForm;
