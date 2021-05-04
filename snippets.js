// getAllSubscribers WITHOUT promise

exports.getAllSubscribers = (req, res, next) => {
    Subscriber.find( {}, (error, subscribers) => {
        if (error) next (error);
        req.data = subscribers;
        next();
    });
};
