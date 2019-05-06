import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import SearchBar from '../components/generic/SearchBar';
import FiltersList from '../components/generic/FiltersList';
import SearchResults from '../components/generic/SearchResults';

/* global document */

// keeping the code dry
const tests = [
    { name: 'SearchBar', component: <SearchBar onQueryChange={jest.fn} /> },
    { name: 'FiltersList', component: <FiltersList onFiltersChange={jest.fn} /> },
    {
        name: 'SearchResults',
        component: (
            <SearchResults filters={['ARTIST', 'ARTWORK']} results={[{ node: { displayLabel: 'Vancouver', imageUrl: '' } }]} />
        ),
    },
];

tests.forEach(test =>
    it(`${test.name} renders without crashing and matches snapshot`, () => {
        const div = document.createElement('div');
        ReactDOM.render(test.component, div);
        ReactDOM.unmountComponentAtNode(div);
        const tree = renderer.create(test.component).toJSON();
        expect(tree).toMatchSnapshot();
    })
);
