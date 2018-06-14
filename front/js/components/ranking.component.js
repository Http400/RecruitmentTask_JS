function Ranking(selector) {
    Component.call(this, selector);
    this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
    const self = this;

    axios.get('http://localhost:3000/numbers')
        .then(function(response) {
            self.numbers = response.data.data.map(function(number) {
                return {
                    id: number,
                    times: 0
                }
            });

            self.render();
        })
        .catch(function(error) {
            console.error(error);
        });
};

Ranking.prototype.render = function() {
    const container = this.getDOMElement();
    container.innerHTML = '';

    this.numbers.sort(function (a, b) {
        return a.times < b.times;
    });

    this.numbers.forEach(function(number) {
        const listElement = document.createElement('li');
        listElement.classList.add('list-group-item');
        listElement.innerHTML = number.id + ' (' + number.times + ')';

        container.appendChild(listElement);
    });
};

Ranking.prototype.update = function(randoms) {
    for (let random of randoms) {
        this.numbers.find(n => n.id === random.id).times++;
    }
    console.log(this.numbers);
    this.render();
};