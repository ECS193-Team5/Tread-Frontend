import renderer from 'react-test-renderer';
import ChallengeForm from '../../../src/components/AddChallenge/ChallengeForm';

it('entry challenge form', () => {
  const component = renderer.create(
    <ChallengeForm>Facebook</ChallengeForm>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

 /* // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();*/
});