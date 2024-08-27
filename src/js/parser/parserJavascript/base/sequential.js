export default {
    type: "sequential",
    parser: function (data) {
        return data["^after^"];
    }
};