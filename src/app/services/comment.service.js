import httpService from "./http.service";
const commentEndpoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.put(
            commentEndpoint + payload._id,
            payload
        );
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: '"page"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    }
};
export default commentService;
