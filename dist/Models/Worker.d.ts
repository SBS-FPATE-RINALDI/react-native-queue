/**
 *
 * Worker Model
 *
 */
export default class Worker {
    /**
     *
     * Singleton map of all worker functions assigned to queue.
     *
     */
    static workers: {};
    /**
     *
     * Assign a worker function to the queue.
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
     * Un-assign worker function from queue.
     *
     * @param jobName {string} - Name associated with jobs assigned to this worker.
     */
    removeWorker(jobName: string): void;
    /**
     *
     * Get the concurrency setting for a worker.
     *
     * Worker concurrency defaults to 1.
     *
     * @param jobName {string} - Name associated with jobs assigned to this worker.
     * @throws Throws error if no worker is currently assigned to passed in job name.
     * @return {number}
     */
    getConcurrency(jobName: string): number;
    /**
     *
     * Execute the worker function assigned to the passed in job name.
     *
     * If job has a timeout setting, job will fail with a timeout exception upon reaching timeout.
     *
     * @throws Throws error if no worker is currently assigned to passed in job name.
     * @param job {object} - Job realm model object
     */
    executeJob(job: object): Promise<void>;
    /**
     *
     * Execute an asynchronous job lifecycle callback associated with related worker.
     *
     * @param callbackName {string} - Job lifecycle callback name.
     * @param jobName {string} - Name associated with jobs assigned to related worker.
     * @param jobId {string} - Unique id associated with job.
     * @param jobPayload {object} - Data payload associated with job.
     */
    executeJobLifecycleCallback(callbackName: string, jobName: string, jobId: string, jobPayload: object): Promise<void>;
}
