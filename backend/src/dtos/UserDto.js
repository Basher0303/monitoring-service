const { Role } = require("../models");

module.exports = class userDto {
    data;

    async init(model) {
        const res = {};
        res.id = model._id;
        res.email = model.email;
        res.isActivated = model.isActivated;

        const roles = await Role.find({
            _id: {
                $in: model.roles
            }
        })

        res.roles = roles.map(el => ({
            _id: el.id,
            name: el.name
        }))

        this.data = res;
        return this.data
    }
}
