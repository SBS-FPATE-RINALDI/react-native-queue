/**
 *
 * Factory should be used to create a new queue instance.
 *
 * @return {Queue} - A queue instance.
 */
export default function queueFactory(): Queue;
export class Queue {
    realm: any;
    worker: Worker;
    status: string;
    /**
     *
     * Initializes the queue by connecting to Realm database.
     *
     */
    init(): Promise<void>;
    /**
     *
     * Add a worker function to the queue.
     *
     * Worker will be called to execute jobs associated with jobName.
     *
     * Worker function will receive job id and job payload as parameters.
     *
     * Example:
     *
     * function exampleJobWorker(id, payload) {
     *  console.log(id); // UUID of job.
     *  console.log(payload); // Payload of data related to job.
     * }
     *
     * @param jobName {string} - Name associated with jobs assigned to this worker.
     * @param worker {function} - The worker function that will execute jobs.
     * @param options {object} - Worker options. See README.md for worker options info.
     */
    addWorker(jobName: string, worker: Function, options?: object): void;
    /**
     *
     * Delete worker function from queue.
     *
     * @param jobName {string} - Name associated with jobs assigned to this worker.
     */
    removeWorker(jobName: string): void;
    /**
     *
     * Creates a new job and adds it to queue.
     *
     * Queue will automatically start processing unless startQueue param is set to false.
     *
     * @param name {string} - Name associated with job. The worker function assigned to this name will be used to execute this job.
     * @param payload {object} - Object of arbitrary data to be passed into worker function when job executes.
     * @param options {object} - Job related options like timeout etc. See README.md for job options info.
     * @param startQueue - {boolean} - Whether or not to immediately begin prcessing queue. If false queue.start() must be manually called.
     */
    createJob(name: string, payload?: object, options?: object, startQueue?: boolean): void;
    /**
     *
     * Start processing the queue.
     *
     * If queue was not started automatically during queue.createJob(), this
     * method should be used to manually start the queue.
     *
     * If queue.start() is called again when queue is already running,
     * queue.start() will return early with a false boolean value instead
     * of running multiple queue processing loops concurrently.
     *
     * Lifespan can be passed to start() in order to run the queue for a specific amount of time before stopping.
     * This is useful, as an example, for OS background tasks which typically are time limited.
     *
     * NOTE: If lifespan is set, only jobs with a timeout property at least 500ms less than remaining lifespan will be processed
     * during queue processing lifespan. This is to buffer for the small amount of time required to query Realm for suitable
     * jobs, and to mark such jobs as complete or failed when job finishes processing.
     *
     * IMPORTANT: Jobs with timeout set to 0 that run indefinitely will not be processed if the queue is running with a lifespan.
     *
     * @param lifespan {number} - If lifespan is passed, the queue will start up and run for lifespan ms, then queue will be stopped.
     * @return {boolean|undefined} - False if queue is already started. Otherwise nothing is returned when queue finishes processing.
     */
    start(lifespan?: number): boolean | undefined;
    /**
     *
     * Stop processing queue.
     *
     * If queue.stop() is called, queue will stop processing until
     * queue is restarted by either queue.createJob() or queue.start().
     *
     */
    stop(): void;
    /**
     *
     * Get a collection of all the jobs in the queue.
     *
     * @param sync {boolean} - This should be true if you want to guarantee job data is fresh. Otherwise you could receive job data that is not up to date if a write transaction is occuring concurrently.
     * @return {promise} - Promise that resolves to a collection of all the jobs in the queue.
     */
    getJobs(sync?: boolean): Promise<any>;
    /**
     *
     * Get the next job(s) that should be processed by the queue.
     *
     * If the next job to be processed by the queue is associated with a
     * worker function that has concurrency X > 1, then X related (jobs with same name)
     * jobs will be returned.
     *
     * If queue is running with a lifespan, only jobs with timeouts at least 500ms < than REMAINING lifespan
     * AND a set timeout (ie timeout > 0) will be returned. See Queue.start() for more info.
     *
     * @param queueLifespanRemaining {number} - The remaining lifespan of the current queue process (defaults to indefinite).
     * @return {promise} - Promise resolves to an array of job(s) to be processed next by the queue.
     */
    getConcurrentJobs(queueLifespanRemaining?: number): Promise<any>;
    /**
     *
     * Process a job.
     *
     * Job lifecycle callbacks are called as appropriate throughout the job processing lifecycle.
     *
     * Job is deleted upon successful completion.
     *
     * If job fails execution via timeout or other exception, error will be
     * logged to job.data.errors array and job will be reset to inactive status.
     * Job will be re-attempted up to the specified "attempts" setting (defaults to 1),
     * after which it will be marked as failed and not re-attempted further.
     *
     * @param job {object} - Job realm model object
     */
    processJob(job: object): Promise<void>;
    /**
     *
     * Delete jobs in the queue.
     *
     * If jobName is supplied, only jobs associated with that name
     * will be deleted. Otherwise all jobs in queue will be deleted.
     *
     * @param jobName {string} - Name associated with job (and related job worker).
     */
    flushQueue(jobName?: string): void;
}
import Worker from "./Worker";
