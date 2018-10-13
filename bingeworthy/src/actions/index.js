// create Action Creator select_Page which returns an action with the
// payload of a new page, should move to its own file later
export const SelectPage = (pageId) => ({
    type: 'select_Page',
    payload: pageId
});
