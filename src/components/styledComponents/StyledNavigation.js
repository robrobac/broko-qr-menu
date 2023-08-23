import styled from 'styled-components'

export const TabNav = styled.ul`
    position: sticky;
    top: 104px;
    padding: 1rem;
    display: flex;
    justify-items: center;
    gap: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    /* Hide standard scrollbar */
    -ms-overflow-style: none;
    /* Hide Internet Explorer scrollbar */
    background-color: white;
    -webkit-box-shadow: 0px 5px 20px 6px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 20px 6px rgba(0, 0, 0, 0.2);
    z-index: 2;
    height: 70px;
`

export const Nav = styled.li`
    list-style: none;

`

export const Search = styled.div`
    position: sticky;
`