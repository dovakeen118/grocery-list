import { BrowserRouter } from 'react-router-dom';

import ListTile from '../../../app/javascript/react/components/ListTile';

describe('List Tile', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ListTile
          id="1"
          name="Whole Foods"
        />
      </BrowserRouter>
    );
  });

  it("Should render an h3 tag containing the list name", () => {
    expect(wrapper.find("h3").text()).toEqual("Whole Foods")
  });

  it("Should render a link to the show page for that list", () => {
    expect(wrapper.find("Link").props()["to"]).toBe("/lists/1")
  });
});
