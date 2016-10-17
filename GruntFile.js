var grunt = require('grunt');
grunt.loadNpmTasks('grunt-shell');


grunt.initConfig({
    shell: {
        listen: {
            command: 'sudo parse-live -o ./savedData/data.txt'
        },
        installHTTPcap: {
          command: 'echo "might require sudo" && brew install pip && pip install httpcap'
        },
        start: {
          command: 'npm start'
        }
    }
});


grunt.start = function() {
  grunt.task.run('shell:listen');
}

module.exports = grunt;
