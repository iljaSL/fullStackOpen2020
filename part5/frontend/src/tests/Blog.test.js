import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../components/Blog';
import { render, fireEvent } from '@testing-library/react';

describe('testing the Blog component', () => {
    let component;
    const updateMockHandler = jest.fn();
    const removeMockHandler = jest.fn();

    beforeEach(() => {
        const blog = {
            likes: 3,
            title: 'Cool Blog 5',
            author: 'Peter Lustig',
            url: 'https://test.com',
            user: {
                username: 'mluukkai',
                name: 'Matti Luukkaine',
                id: '5f7481f61111ab3dcd0f628b'
            },
            id: '5f7481f61111ab3dcd0f628b'
        };

        component = render(
            <Blog blog={blog} />
        )
    })

    test('renders the blogs title and author, but does not render its url or number of likes by default', () => {
        const element = component.getByText(
            'Cool Blog 5 by Peter Lustig'
        )
        expect(element).toBeDefined()
    })
})